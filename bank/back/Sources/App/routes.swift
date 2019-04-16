import Vapor

public func routes(_ router: Router) throws {
    let paymentController = PaymentController()
    router.get("payment", use: paymentController.index)
    router.post("payment", use: paymentController.create)
    
    let bankAccountController = BankAccountController()
    router.get("account", use: bankAccountController.index)
    router.post("account", use: bankAccountController.create)
    
    let saleContractController = SaleContractController()
    router.post("contract", use: saleContractController.create)
}
