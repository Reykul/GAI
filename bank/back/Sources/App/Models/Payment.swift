import FluentMySQL
import Vapor

final class Payment: MySQLModel {
    typealias ID = Int
    var id: Int?
    var fromId: Int
    var toId: Int
    var amount: Double
    
    init(id: Int? = nil, fromId: Int, toId: Int, amount: Double) {
        self.id = id
        self.fromId = fromId
        self.toId = toId
        self.amount = amount
    }
}

extension Payment: Migration { }
extension Payment: Content { }
extension Payment: Parameter { }
