import FluentMySQL
import Vapor

final class SaleContract: MySQLModel {
    var id: Int?
    var date: Date?
    var sellerId: Person.ID
    var buyerId: Person.ID
    var carId: Car.ID
    
    init(id: Int? = nil, date: Date = Date(), sellerId: Person.ID, buyerId: Person.ID, carId: Car.ID) {
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
