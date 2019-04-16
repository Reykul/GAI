import Vapor

public func routes(_ router: Router) throws {
    let carController = CarController()
    router.get("car", use: carController.index)
    router.post("car", use: carController.create)
    router.delete("car", use: carController.delete)
    
    let proxyController = ProxyController()
    router.post("proxy", use: proxyController.addProxy)
    
    let saleContractController = SaleContractController()
    router.post("contract", use: saleContractController.create)
    
    let stateDutyController = StateDutyController()
    router.post("duty", use: stateDutyController.create)
}
