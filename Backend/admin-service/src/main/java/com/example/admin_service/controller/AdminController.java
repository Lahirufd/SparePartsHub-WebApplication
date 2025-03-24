package com.example.admin_service.controller;

import com.example.admin_service.data.Admin;
import com.example.admin_service.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping(path = "/admins")
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.createAdmin(admin);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> loginAdmin(@RequestBody Admin admin) {
        Admin existingAdmin = adminService.findAdminByUsername(admin.getUsername());
        if (existingAdmin != null && existingAdmin.getPassword().equals(admin.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @GetMapping(path = "/admins")
    public List<Admin> findAllAdmins() {
        return adminService.getAdmins();
    }

    @DeleteMapping(path = "/admins/{id}")
    public ResponseEntity<String> deleteAdminById(@PathVariable int id) {
        boolean isDeleted = adminService.deleteAdminById(id);

        if (isDeleted) {
            return ResponseEntity.ok("Admin account deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Admin not found.");
        }
    }

//    @GetMapping(path = "/admins", params = "username")
//    public int findIdByUsername(@RequestParam String username) {
//        return adminService.findIdByUsername(username);
//    }

    @GetMapping(path = "/admins/role", params = "username")
    public String findRoleByUsername(@RequestParam String username) {
        return adminService.findRoleByUsername(username);
    }
}
