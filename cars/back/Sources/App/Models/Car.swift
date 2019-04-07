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
    var id: Int?
    var brand: String
    var model: String
    var personId: Person.ID?
    var condition: Condition?
    var isInCarjacking: Bool
    
    
    init(id: Int? = nil, brand: String, model: String, personId: Person.ID? = nil, condition: Condition? = Condition.new, isInCarjacking: Bool) {
        self.id = id
        self.brand = brand
        self.model = model
        self.personId = personId
        self.condition = condition
        self.isInCarjacking = isInCarjacking
    }
}

extension Car: Migration { }
extension Car: Content { }
extension Car: Parameter { }
