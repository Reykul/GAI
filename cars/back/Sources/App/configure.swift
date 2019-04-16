import Vapor
import FluentMySQL

public func configure(_ config: inout Config, _ env: inout Environment, _ services: inout Services) throws {
    try services.register(FluentMySQLProvider())
    services.register(LoggerMiddleware.self)
    
    let serverConfig = NIOServerConfig.default(hostname: "localhost", port: 8081)
    services.register(serverConfig)
 
    var databases = DatabasesConfig()
    let mysqlConfig = MySQLDatabaseConfig(
        hostname: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "cars"
    )
    let database = MySQLDatabase(config: mysqlConfig)
    databases.add(database: database, as: .mysql)
    services.register(databases)

    let router = EngineRouter.default()
    try routes(router)
    services.register(router, as: Router.self)
    
    var middlewares = MiddlewareConfig()
    let corsConfiguration = CORSMiddleware.Configuration(
        allowedOrigin: .all,
        allowedMethods: [.GET, .POST, .PUT, .OPTIONS, .DELETE, .PATCH],
        allowedHeaders: [.accept, .authorization, .contentType, .origin, .xRequestedWith, .userAgent, .accessControlAllowOrigin, .accessControlRequestHeaders]
    )
    let corsMiddleware = CORSMiddleware(configuration: corsConfiguration)
    middlewares.use(corsMiddleware)
    middlewares.use(LoggerMiddleware.self)
    middlewares.use(ErrorMiddleware.self)
    services.register(middlewares)

    var migrations = MigrationConfig()
    migrations.add(model: Proxy.self, database: .mysql)
    migrations.add(model: StateDuty.self, database: .mysql)
    migrations.add(model: Car.self, database: .mysql)
    migrations.add(model: SaleContract.self, database: .mysql)
    services.register(migrations)
}
