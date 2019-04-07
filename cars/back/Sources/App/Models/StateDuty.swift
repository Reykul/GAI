import FluentMySQL
import Vapor

final class StateDuty: MySQLModel {
    var id: Int?
    var carId: Car.ID
    var amount: Double
    
    init(id: Int? = nil, carId: Car.ID, amount: Double) {
        self.id = id
        self.carId = carId
        self.amount = amount
    }
}

extension StateDuty: Migration { }
extension StateDuty: Content { }
extension StateDuty: Parameter { }
