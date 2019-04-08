import Vapor

final class PaymentController {
    func index(_ req: Request) throws -> Future<[Payment]> {
        return Payment.query(on: req).all()
    }
    
    func create(_ req: Request) throws -> Future<Payment> {
        return try req.content.decode(Payment.self).flatMap { payment in
            return payment.save(on: req)
        }
    }
}
