﻿namespace KvizAPI.DTOs
{
    public class RegisterModel
    {
        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string RepeatPassowrd { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
    }
}
