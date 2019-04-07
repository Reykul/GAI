import FluentMySQL
import Vapor

final class Proxy: MySQLModel {
    var id: Int?
    var startDate: Date?
    var endDate: Date?
    var allowTo: Int
    var carId: Car.ID
    
    init(id: Int? = nil, carId: Int, startDate: Date = Date(), endDate: Date? = Calendar.current.date(byAdding: .year, value: 1, to: Date()), allowTo: Int) {
        print("startDate", startDate)
        
        self.id = id
        self.carId = carId
        self.startDate = startDate
        self.endDate = endDate
        self.allowTo = allowTo
    }
}

extension Proxy: Migration { }
extension Proxy: Content { }
extension Proxy: Parameter { }
