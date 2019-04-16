import Vapor

// TODO add request's to another service when contract added

final class SaleContractController {
    func index(_ req: Request) throws -> Future<[SaleContract]> {
        return SaleContract.query(on: req).all()
    }
    
    func create(_ req: Request) throws -> Future<SaleContract> {
        return try req.content.decode(SaleContract.self).flatMap { saleContract in
            print("sale contract", saleContract)
            return saleContract.save(on: req)
        }
    }
}
