package com.example.admin_service.service;

import com.example.admin_service.data.Admin;
import com.example.admin_service.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public List<Admin> getAdmins() {
        return adminRepository.findAll();
    }

    public boolean deleteAdminById(int id) {
        Optional<Admin> admin = adminRepository.findById(id);
        if (admin.isPresent()) {
            adminRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Admin findAdminByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

//    public int findIdByUsername(String username) {
//        return adminRepository.findIdByUsername(username);
//    }

    public String findRoleByUsername(String username) {
        return adminRepository.findRoleByUsername(username);
    }
}
