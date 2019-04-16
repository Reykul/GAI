import FluentMySQL
import Vapor

final class BankAccount: MySQLModel {
    typealias ID = Int
    var id: Int?
    var userId: Int
    var amount: Double
    
    init(id: Int? = nil, userId: Int, amount: Double) {
        self.id = id
        self.userId = userId
        self.amount = amount
    }
}

extension BankAccount: Migration { }
extension BankAccount: Content { }
extension BankAccount: Parameter { }
