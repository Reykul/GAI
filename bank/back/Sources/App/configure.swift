import Vapor
import FluentMySQL

public func configure(_ config: inout Config, _ env: inout Environment, _ services: inout Services) throws {
    try services.register(FluentMySQLProvider())
    services.register(LoggerMiddleware.self)
    
    let serverConfig = NIOServerConfig.default(hostname: "localhost", port: 8082)
    services.register(serverConfig)
    
    var databases = DatabasesConfig()
    let mysqlConfig = MySQLDatabaseConfig(
        hostname: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "bank"
    )
    let database = MySQLDatabase(config: mysqlConfig)
    databases.add(database: database, as: .mysql)
    services.register(databases)
    
    let router = EngineRouter.default()
    try routes(router)
    services.register(router, as: Router.self)
    
    var middlewares = MiddlewareConfig()
    middlewares.use(LoggerMiddleware.self)
    middlewares.use(ErrorMiddleware.self)
    services.register(middlewares)
    
    var migrations = MigrationConfig()
    migrations.add(model: BankAccount.self, database: .mysql)
    migrations.add(model: Payment.self, database: .mysql)
    services.register(migrations)
}
