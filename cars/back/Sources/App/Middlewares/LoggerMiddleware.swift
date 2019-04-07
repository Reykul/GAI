import Foundation
import Vapor

final class LoggerMiddleware: Middleware {
    private let logger: Logger
    
    init(logger: Logger) {
        self.logger = logger
    }
    
    private func log(_ response: Response, for request: Request, whichStartedAt startTime: Date) {
        let requestInfo = "\(request.http.method.string) \(request.http.url.path)" + (request.http.url.query.map { "?\($0)" } ?? "")
        let responseInfo = "\(response.http.status.code) \(response.http.status.reasonPhrase)"
        let time = Date()
        logger.info("\(requestInfo) -> \(responseInfo) [\(time)]")
    }
    
    func respond(to request: Request, chainingTo next: Responder) throws -> EventLoopFuture<Response> {
        print("sekskk", request)
        let startTime = Date()
        return try next.respond(to: request).map { response in
            self.log(response, for: request, whichStartedAt: startTime)
            return response
        }
    }
}

extension LoggerMiddleware: ServiceType {
    static func makeService(for worker: Container) throws -> LoggerMiddleware {
        return try LoggerMiddleware(logger: worker.make())
    }
}
