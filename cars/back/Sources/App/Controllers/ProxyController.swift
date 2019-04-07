import Vapor

final class ProxyController {
    func index(_ req: Request) throws -> Future<[Proxy]> {
        return Proxy.query(on: req).all()
    }
    
    func addProxy(_ req: Request) throws -> Future<Car> {
        return try req.content.decode(Proxy.self).flatMap { proxy in
            proxy.save(on: req)
            return Car.find(proxy.carId, on: req).map(to: Car.self) { car in
                guard let car = car else {
                    throw Abort.init(HTTPStatus.notFound)
                }
                
                return car
            }.update(on: req)
        }
    }
}
