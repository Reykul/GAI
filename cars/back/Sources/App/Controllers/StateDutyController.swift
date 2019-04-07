import Vapor

// TODO add request's to another service when state duty is payed

final class StateDutyController {
    func index(_ req: Request) throws -> Future<[Proxy]> {
        return Proxy.query(on: req).all()
    }
    
    func create(_ req: Request) throws -> Future<StateDuty> {
        return try req.content.decode(StateDuty.self).flatMap { stateDuty in
            
            return stateDuty.save(on: req)
        }
    }
}
