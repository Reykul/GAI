import FluentMySQL
import Vapor

final class BankAccount: MySQLModel {
    typealias ID = Int
    var id: Int?
    var amount: Double
    
    init(id: Int? = nil, amount: Double) {
        self.id = id
        self.amount = amount
    }
}

extension BankAccount: Migration { }
extension BankAccount: Content { }
extension BankAccount: Parameter { }
