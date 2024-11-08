package com.example.user_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("select u from User u where u.username=?1")
    User findByUsername(String username);

    @Query("select u.id from User u where u.username=:username")
    int findIdByUsername(@Param("username") String username);

    @Query("select u.role from User u where u.username=:username")
    String findRoleByUsername(@Param("username") String username);
}
