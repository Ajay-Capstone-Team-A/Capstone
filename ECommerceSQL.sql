/*******************************************************************************
   ECommerce Database - Version 1.0
   Script: ECommerceSQL.sql
   Description: Creates and populates the ECommerce database.
********************************************************************************/

/*******************************************************************************
   Drop Constraints
********************************************************************************/

/*******************************************************************************
   Drop Tables
********************************************************************************/

   DROP TABLE [ecd].[Products];
   GO

   DROP TABLE [ecd].[Users];
   GO

/*******************************************************************************
   Drop Schema
********************************************************************************/

   DROP SCHEMA [ecd];
   GO

/*******************************************************************************
   Create Schema
********************************************************************************/

   CREATE SCHEMA [ecd];
   GO

/*******************************************************************************
   Create Tables
********************************************************************************/

   CREATE TABLE [ecd].[Users]
   (
      [UserId] INT IDENTITY(1,1) NOT NULL,
      [UserFirstName] NVARCHAR(255) NOT NULL,
      [UserLastName] NVARCHAR(255) NOT NULL,
      [UserEmail] NVARCHAR(255) UNIQUE NOT NULL,
      [UserPassword] NVARCHAR(255) NOT NULL,
   );
   GO

   CREATE TABLE [ecd].[Products]
   (
      [ProductId] INT IDENTITY(1,1) NOT NULL,
      [ProductName] NVARCHAR(255) NOT NULL,
      [ProductQuantity] INT NOT NULL,
      [ProductPrice] MONEY NOT NULL,
      [ProductDescription] NVARCHAR(255),
      [ProductImage] NVARCHAR(255)
   );
   GO
   
   CREATE TABLE [ecd].[Reviews] (
    [ReviewId] INT IDENTITY(1,1) NOT NULL,
    [UserId] INT NOT NULL,
    [ProductId] INT NOT NULL,
    [Comment] VARCHAR(255),
    [Rating] INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES ecd.Users(UserId),
    FOREIGN KEY (ProductId) REFERENCES ecd.Products(ProductId)
)
GO;
   
/*******************************************************************************
   Create Primary Key References
********************************************************************************/

   ALTER TABLE [ecd].[Users]
      ADD CONSTRAINT [PK_UserId]
      PRIMARY KEY ([UserId]);
   GO

   ALTER TABLE [ecd].[Products]
      ADD CONSTRAINT [PK_ProductId]
      PRIMARY KEY ([ProductId]);
   GO

/*******************************************************************************
   Seed Database
********************************************************************************/

   INSERT INTO [ecd].[Users] ([UserFirstName], [UserLastName], [UserEmail], [UserPassword])
      VALUES
         ('John', 'Doe', 'John@no.com', 'JohnDoe'),
         ('Jane', 'Doe', 'Jane@no.com', 'JaneDoe'),
         ('Johnny', 'Doe', 'Johnny@no.com', 'JohnnyDoe'),
         ('Jannie', 'Doe', 'Jannie@no.com', 'JannieDoe');
   GO

   INSERT INTO [ecd].[Products] ([ProductName], [ProductQuantity], [ProductPrice], [ProductDescription], [ProductImage])
      VALUES
         ('Altoid Mint', 2, 2.99, 'Curiously strong mints', 'https://www.altoids.com/sites/g/files/fnmzdf651/files/migrate-product-files/khgaap6bku2q9b8qrioh.png'),
         ('S3 Watch', 4, 399.99, 'More computing power than the space shuttle!', 'https://image-us.samsung.com/SamsungUS/home/mobile/wearables/pdp/sm-r760ndaaxar/gallery/S3_Frontier_Front_1600x1200.jpg?$product-details-jpg$'),
         ('Lenovo Thinkpad', 3, 599.94, 'Not the worst laptop... but not the best. Just... OK', 'https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8Mjc4NTk5fGltYWdlL3BuZ3xoMWEvaGQxLzEwODIyNzQwNDc1OTM0LnBuZ3w1MzRhMTMxYzE3YmY4MTgyOWNmYWIxNjA3OGVjNjMzZjBiM2JlNGI0ZDkyNGY3ZTRhOGU5MmI2OTVjNWE2ZTJl/lenovo-laptop-thinkpad-l14-intel-hero1.png'),
         ('Garuda Arch Linux OS', 999, 0.0, 'Yeah, it''s a free OS. Yes, it''s real. Yes, you should check it out.', 'https://www.addictivetips.com/app/uploads/2021/11/garuda-desktop-installer.png'),
         ('Corsair K70 Mk II', 6, 240.00, 'High sensitivity keyboard for gamers and professionals alike.', 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6491/6491897_sd.jpg);
   GO
   
   INSERT INTO [ecd].[Reviews] ([UserId],[ProductId],[Comment],[Rating]) 
      VALUES
         (2,1,'Little too minty',4);
         (1,1,'Very minty',5);
         (4,3,'Pretty reliable laptop',4);
         (3,4,'Cant complain, its free',5);
         (1,5,'Very reliable keyboard',5);
         (2,2,'Way too overpriced',2);
    GO
         
