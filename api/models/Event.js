function Event( id 
              , name
              , description
              , adminId
              , maxGiftPrice
              , street, city, state, zipCode
              , dateOccurs, dateCreated
              ) {

  this.id = id;
  this.name = name;
  this.description = description;
  this.adminId = adminId;
  this.maxGiftPrice = maxGiftPrice;

  this.date = {
    'created' : dateCreated
  , 'occurs'  : dateOccurs
  };

  this.location = {
    'street'  : street
  , 'city'    : city
  , 'state'   : state
  , 'zipCode' : zipCode
  };
};

module.exports = Event;
