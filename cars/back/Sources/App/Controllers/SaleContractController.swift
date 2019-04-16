import Vapor

// TODO add request's to another service when contract added

final class SaleContractController {
    func index(_ req: Request) throws -> Future<[SaleContract]> {
        return SaleContract.query(on: req).all()
    }
    
    func create(_ req: Request) throws -> Future<Car> {
        return try req.content.decode(SaleContract.self).flatMap { saleContract in
            print("sale contract", saleContract)
            saleContract.save(on: req)
            return Car.find(saleContract.carId, on: req).map(to: Car.self) { car in
                guard let car = car else {
                    throw Abort.init(HTTPStatus.notFound)
                }
                car.ownerId = saleContract.buyerId
                return car
            }.update(on: req)
        }
    }
}
