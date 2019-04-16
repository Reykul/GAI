import FluentMySQL
import Vapor

final class SaleContract: MySQLModel {
    var id: Int?
    var date: Date?
    var sellerId: Int
    var buyerId: Int
    var carId: Int
    
    init(id: Int? = nil, date: Date = Date(), sellerId: Int, buyerId: Int, carId: Int) {
        self.id = id
        self.date = date
        self.sellerId = sellerId
        self.buyerId = buyerId
        self.carId = carId
    }
}

extension SaleContract: Migration { }
extension SaleContract: Content { }
extension SaleContract: Parameter { }
