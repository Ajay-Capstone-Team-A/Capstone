using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerce.Models
{
    [Table("Users", Schema = "ecd")]

    public class User
    {
        [Key]
        /*public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }*/
        public int UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }

        public User() { }
        public User(int UserId, string UserFirstName, string UserLastName, string UserEmail, string UserPassword)
        {
            this.UserId = UserId;
            this.UserFirstName = UserFirstName;
            this.UserLastName = UserLastName;
            this.UserEmail = UserEmail;
            this.UserPassword = UserPassword;   
            
        }
        public User(string UserFirstName, string UserLastName, string UserEmail, string UserPassword)
        {
            this.UserFirstName = UserFirstName;
            this.UserLastName = UserLastName;
            this.UserEmail = UserEmail;
            this.UserPassword = UserPassword;

        }

        /*public User(int id, string firstName, string lastName, string email, string password)
        {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
        }
        public User(string firstName, string lastName, string email, string password)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
        }*/
    }
}