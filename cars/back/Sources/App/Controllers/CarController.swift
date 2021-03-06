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
    
    func delete(_ req: Request) throws -> Future<HTTPStatus> {
        let carId = try req.query.get(Int.self, at: "carId")
        return Car.find(carId, on: req).flatMap { car in
            guard let car = car else {
                throw Abort(.notFound)
            }
            
            return car.delete(on: req).transform(to: HTTPStatus.ok)
        }
    }
}
