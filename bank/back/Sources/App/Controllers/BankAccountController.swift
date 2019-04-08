import Vapor

final class BankAccountController {
    func index(_ req: Request) throws -> Future<[BankAccount]> {
        return BankAccount.query(on: req).all()
    }
    
    func create(_ req: Request) throws -> Future<BankAccount> {
        return try req.content.decode(BankAccount.self).flatMap { bankAccount in
            return bankAccount.save(on: req)
        }
    }
}
