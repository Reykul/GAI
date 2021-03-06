# Проект "ГАИ"

* водители (выдача водительских прав после сдачи экзамена и оплаты гос. пошлины, изъятие водительских прав в результате правонарушения, на определённый период или постоянно);
* автомобили (регистрация автомобилей, их владельцев, выписанных доверенностей, их состояния, не находятся ли в угоне, фиксация покупки-продажи автомобилей и уплаты гос. пошлин при оформлении документов);
* правонарушения (фиксация правонарушений с проверкой факта права вождения водителем данного автомобиля с привлечением сервисов водителей и автомобилей и фиксация оплаты штрафов, изъятие при необходимости водительских прав с отметкой в сервисе водителей);
* банк (счета и переводы, здесь будут фиксироваться любые финансовые операции - оплата гос. пошлин, купли-продажи автомобилей, штрафы).

# Project schema

![alt text](https://i.ibb.co/VDY6x7d/gai-schema.png)

# автомобили
frontend: React.js  
backend: Vapor(Swift)
database: Fluent ORM(MySQL)  
Routes:  
  * /car  
    + GET  - получить список всех авто;  
       + params:
          + name(string) - поиск авто по названию модели  
    + POST - зарегистрировать авто  
       + params:  
          + brand(string) - название бренда  
          + model(string) - название модели  
          + ownerId(int?) - идентификатор владельца авто 
          + condition(enum new|good|bad) - состояние авто  
          + isInCarjacking(bool) - находится ли авто в угоне  
  * /proxy  
    + POST - выписать доверенность на авто  
      + params:  
        + carId(int) - идентификатор авто  
        + startDate(date?) - дата начала действия доверенности  
        + endDate(date?) - дата окончания действия доверенности  
        + allowTo(int) - идентификатор человека, которому выписывается доверенность  
  * /contract
    + POST - зафиксировать покупку-продажу авто
       + params:
          + date(date?) - дата совершения сделки
          + sellerId(int) - идентификатор продавца авто
          + buyerId(int) - идентификатор человека, покупающего авто
          + carId(int) - идентификатор авто
  * /duty  
     + POST - зафиксировать уплату гос. пошлин
        + params:
          + carId(int) - идентификатор машины
          + amount(int) - сумма гос. пошлины
        
# банк
frontend: React.js  
backend: Vapor(Swift)  
database: Fluent ORM(MySQL)  
Routes:  
  * /payment
    + GET - получить список переводов
    + POST - создать платеж
      + params:
        + fromId(int) - идентификатор пользователя от которого совершается перевод
        + toId(int) - идентификатор пользователя которому совершается перевод
        + amount(double) - сумма платежа
  * /account
    + GET - получить счёт
    + POST - создать счёт
      + params:
        + userId(int) - идентификатор пользователя счёта
        + amount(int) - сумма на счёте

# Technologies
* React.js - frontend
* Node.js - backend
* MySQL - backend

# Database schemas
* Drivers
* Cars
* Bank
* Offences
