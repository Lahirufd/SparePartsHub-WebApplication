package com.example.admin_service.repository;

import com.example.admin_service.data.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
    @Query("select a from Admin a where a.username=?1")
    Admin findByUsername(String username);

//    @Query("select a.id from Admin a where a.username=:username")
//    int findIdByUsername(@Param("username") String username);

    @Query("select a.role from Admin a where a.username=:username")
    String findRoleByUsername(@Param("username") String username);
}
