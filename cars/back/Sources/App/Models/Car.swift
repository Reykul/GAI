import FluentMySQL
import Vapor

enum Condition: String, MySQLEnumType, ReflectionDecodable {
    static func reflectDecoded() throws -> (Condition, Condition) {
        return (.new, .good)
    }
    
    case new
    case good
    case bad
}

final class Car: MySQLModel {
    typealias ID = Int
    var id: Int?
    var brand: String
    var model: String
    var ownerId: Int?
    var condition: Condition?
    var isInCarjacking: Bool
    
    init(id: Int? = nil, brand: String, model: String, ownerId: Int? = nil, condition: Condition? = Condition.new, isInCarjacking: Bool) {
        self.id = id
        self.brand = brand
        self.model = model
        self.ownerId = ownerId
        self.condition = condition
        self.isInCarjacking = isInCarjacking
    }
}

extension Car {
    var proxys: Children<Car, Proxy> {
        return self.children(\.carId)
    }
}

extension Car {
    var saleContracts: Children<Car, SaleContract> {
        return self.children(\.carId)
    }
}

extension Car {
    var saleDuties: Children<Car, StateDuty> {
        return self.children(\.carId)
    }
}

extension Car: Migration { }
extension Car: Content { }
extension Car: Parameter { }
