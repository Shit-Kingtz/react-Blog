'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;

        ctx.body = '123';
    }

    async getArticleList() {
        let sql =   `SELECT
                        article.id AS id,
                        article.title AS title,
                        article.introduce AS introduce,
                        FROM_UNIXTIME( article.addTime, '%Y-%m-%d %H:%i:%s' ) AS addTime,
                        article.view_count AS view_count,
                        type.typeName AS typeName 
                    FROM
                        article
                        LEFT JOIN type ON article.type_id = type.id`

        const result = await this.app.mysql.query(sql)
        this.ctx.body = {data: result}
    }

    async getArticleById() {
        let id = this.ctx.params.id
        let sql =   `SELECT
                        article.id AS id,
                        article.title AS title,
                        article.introduce AS introduce,
                        article.article_content as article_content,
                        FROM_UNIXTIME( article.addTime, '%Y-%m-%d %H:%i:%s' ) AS addTime,
                        article.view_count AS view_count,
                        type.typeName AS typeName, 
                        type.id AS typeId
                    FROM
                        article
                        LEFT JOIN type ON article.type_id = type.id
                    WHERE 
                        article.id = ${id}`

        const result = await this.app.mysql.query(sql)
        this.ctx.body = {data: result}
    }

    // 获取类别名称和编号
    async getTypeInfo() {
        const result = await this.app.mysql.select('type')
        this.ctx.body = {data: result}
    }

    // 根据类别获取文章列表
    async getListById() {
        let id = this.ctx.params.id
        let sql =   `SELECT
                        article.id AS id,
                        article.title AS title,
                        article.introduce AS introduce,
                        FROM_UNIXTIME( article.addTime, '%Y-%m-%d %H:%i:%s' ) AS addTime,
                        article.view_count AS view_count,
                        type.typeName AS typeName 
                    FROM
                        article
                        LEFT JOIN type ON article.type_id = type.id
                    WHERE
                        type_id = ${id}`

        const result = await this.app.mysql.query(sql)
        this.ctx.body = {data: result}
    }
}

module.exports = HomeController;
