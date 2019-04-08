import Vapor
import FluentSQL

final class CarController {
    func index(_ req: Request) throws -> Future<[Car]> {
        if let name = try? req.query.get(String.self, at: "name") {
            return Car.query(on: req).group(.or) { query in
                query.filter(\Car.model =~ name).all()
            }.all()
        }
        return Car.query(on: req).all()
    }
        
    func create(_ req: Request) throws -> Future<Car> {
        return try req.content.decode(Car.self).flatMap { car in
            
            return car.save(on: req)
        }
    }
    
    func search(_ req: Request) throws -> Future<[Car]> {
        let name: String = try req.parameters.next(String.self)
        return Car.query(on: req).all()
    }
        
    func delete(_ req: Request) throws -> Future<HTTPStatus> {
        return try req.parameters.next(Car.self).flatMap { car in
            return car.delete(on: req)
            }.transform(to: .ok)
    }
}
