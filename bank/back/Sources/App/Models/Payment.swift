import FluentMySQL
import Vapor

final class Payment: MySQLModel {
    typealias ID = Int
    var id: Int?
    var fromId: Int
    var toId: Int
    
    init(id: Int? = nil, fromId: Int, toId: Int) {
        self.id = id
        self.fromId = fromId
        self.toId = toId
    }
}

extension Payment: Migration { }
extension Payment: Content { }
extension Payment: Parameter { }
