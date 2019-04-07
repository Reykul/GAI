import FluentMySQL
import Vapor

final class Person: MySQLModel {
    var id: Int?
    var name: String
    
    init(id: Int? = nil, name: String) {
        self.id = id
        self.name = name
    }
}

extension Person: Migration { }
extension Person: Content { }
extension Person: Parameter { }
