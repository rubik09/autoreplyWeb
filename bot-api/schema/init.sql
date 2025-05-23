create database if not exists autoReply;

use autoReply;

CREATE TABLE IF NOT EXISTS `admins`
(
    `id`       int(11)      NOT NULL AUTO_INCREMENT,
    `email`    varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 91639
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `sessions`
(
    `id`           int(11) NOT NULL AUTO_INCREMENT,
    `log_session`  longtext     DEFAULT '',
    `region`       varchar(255) DEFAULT '',
    `status`       tinyint(1)   DEFAULT 0,
    `api_id`       varchar(255) UNIQUE,
    `api_hash`     varchar(255) UNIQUE,
    `user_id`      varchar(255) UNIQUE,
    `username`     varchar(255) UNIQUE,
    `phone_number` varchar(255) UNIQUE,
    `keywords`     longtext,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 76544
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

CREATE TABLE `stats`
(
    `id`                      int(11) NOT NULL AUTO_INCREMENT,
    `api_id_client`           varchar(255),
    `users_count`             int(11),
    `incoming_messages_count` int(11) DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 81339
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `users`
(
    `id`            int(11) NOT NULL AUTO_INCREMENT,
    `user_id`       varchar(255) DEFAULT '',
    `api_id_client` varchar(255) DEFAULT '',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 91639
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

insert into autoReply.admins (id, email, password)
values (1223, 'admin@gmail.com', '$2a$10$DkZhAnFQfsyVZydoN.h3Keq1FDgl2t23jG0woWtSKEcZ6Kv/fx6VW');
