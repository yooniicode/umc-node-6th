-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS missionDB;

-- 생성한 데이터베이스 사용
USE missionDB;

-- member 테이블 생성
CREATE TABLE IF NOT EXISTS member (
                                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                      name VARCHAR(10),
                                      gender VARCHAR(10),
                                      birth DATE,
                                      address VARCHAR(100),
                                      favorite_food SET,
                                      nickname VARCHAR(20),
                                      point INT,
                                      status VARCHAR(10),
                                      inactive DATETIME(6),
                                      created_at DATETIME(6),
                                      updated_at DATETIME(6)
);

-- location_mission 테이블 생성
CREATE TABLE IF NOT EXISTS location_mission (
                                                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                                member_id BIGINT,
                                                complete_count INT,
                                                created_at DATETIME(6),
                                                updated_at DATETIME(6),
                                                FOREIGN KEY (member_id) REFERENCES member(id)
);

-- mission 테이블 생성
CREATE TABLE IF NOT EXISTS mission (
                                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                       location_mission_id BIGINT,
                                       content VARCHAR(50),
                                       location VARCHAR(20),
                                       is_start BOOLEAN,
                                       is_complete BOOLEAN,
                                       deadline INT,
                                       serial_number INT,
                                       created_at DATETIME(6),
                                       updated_at DATETIME(6),
                                       FOREIGN KEY (location_mission_id) REFERENCES location_mission(id)
);

-- restaurant 테이블 생성
CREATE TABLE IF NOT EXISTS restaurant (
                                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                          name VARCHAR(20),
                                          address VARCHAR(100),
                                          type VARCHAR(20),
                                          created_at DATETIME(6),
                                          updated_at DATETIME(6)
);

-- mission_restaurant 테이블 생성
CREATE TABLE IF NOT EXISTS mission_restaurant (
                                                  mission_id BIGINT,
                                                  restaurant_id BIGINT,
                                                  PRIMARY KEY (mission_id, restaurant_id),
                                                  FOREIGN KEY (mission_id) REFERENCES mission(id),
                                                  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
);

-- review 테이블 생성
CREATE TABLE IF NOT EXISTS review (
                                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                      content TEXT,
                                      rating INT,
                                      created_at DATETIME(6),
                                      updated_at DATETIME(6)
);

-- mission_review 테이블 생성
CREATE TABLE IF NOT EXISTS mission_review (
                                              id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                              mission_id BIGINT,
                                              review_id BIGINT,
                                              created_at DATETIME(6),
                                              updated_at DATETIME(6),
                                              FOREIGN KEY (mission_id) REFERENCES mission(id),
                                              FOREIGN KEY (review_id) REFERENCES review(id)
);
