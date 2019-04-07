import Vapor

final class CarController {
    func index(_ req: Request) throws -> Future<[Car]> {
        return Car.query(on: req).all()
    }
        
    func create(_ req: Request) throws -> Future<Car> {
        return try req.content.decode(Car.self).flatMap { car in
            
            return car.save(on: req)
        }
    }
        
    func delete(_ req: Request) throws -> Future<HTTPStatus> {
        return try req.parameters.next(Car.self).flatMap { car in
            return car.delete(on: req)
            }.transform(to: .ok)
    }
}
