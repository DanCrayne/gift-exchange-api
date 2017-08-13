function WishlistItem( id 
                     , name
                     , event_id
                     , user_id
                     , description
                     , url
                     ) {

  this.id = id;
  this.name = name;
  this.eventId = eventId;
  this.userId = userId;
  this.description = description;
  this.url = url;
};

module.exports = WishlistItem;
