CREATE DATABASE IF NOT EXISTS autoReply;

USE autoReply;

CREATE TABLE IF NOT EXISTS `client_datas`
(
    `id`           int(11) NOT NULL AUTO_INCREMENT,
    `user_id`      varchar(255) DEFAULT '',
    `username`     varchar(255) DEFAULT '' UNIQUE,
    `phone_number` varchar(255) DEFAULT '' UNIQUE,
    `password`     varchar(255) DEFAULT '' UNIQUE,
    PRIMARY KEY (`id`),
    KEY            `user_id` (`user_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 143
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `sessions`
(
    `id`             int(11) NOT NULL AUTO_INCREMENT,
    `log_session`    longtext     DEFAULT '',
    `api_id`         varchar(255) DEFAULT '' UNIQUE,
    `api_hash`       varchar(255) DEFAULT '' UNIQUE,
    `answers`        longtext     DEFAULT '',
    `client_user_id` varchar(255) DEFAULT '',
    `status`         tinyint(1) DEFAULT 0,
    PRIMARY KEY (`id`),
    KEY              `client_user_id` (`client_user_id`),
    CONSTRAINT `fk_sessions_client_datas` FOREIGN KEY (`client_user_id`) REFERENCES `client_datas` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 76544
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `users`
(
    `id`            int(11) NOT NULL AUTO_INCREMENT,
    `user_id`       varchar(255) DEFAULT '' UNIQUE,
    `api_id_client` varchar(255) DEFAULT '',
    `answers`       longtext     DEFAULT '',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 91639
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `stats`
(
    `id`              int(11) NOT NULL AUTO_INCREMENT,
    `users_count`     varchar(255) DEFAULT '',
    `reg_count`       varchar(255) DEFAULT '',
    `first_dep_count` varchar(255) DEFAULT '',
    `api_id_client`   varchar(255) DEFAULT '',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 81311
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;