'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.body = '123';
  }

  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const passWord = this.ctx.request.body.passWord;

    const sql = `SELECT
                        userName
                    FROM
                        admin_user
                    WHERE
                        userName = '${userName}' 
                        AND passWord = '${passWord}'`;

    const result = await this.app.mysql.query(sql);
    if (result.length) {
      const openId = new Date().getTime();
      this.ctx.session.openId = openId;
      this.ctx.body = { data: '登录成功', openId };
    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }

  async addArticle() {
    let tmpArticle = this.ctx.request.body
    const result = await this.app.mysql.insert('article', tmpArticle)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId

    this.ctx.body = {
      success: insertSuccess,
      insertId: insertId,
    }
  }

  async updateArticle() {
    let tmpArticle = this.ctx.request.body
    const result = await this.app.mysql.update('article', tmpArticle)
    const updateSuccess = result.affectedRows === 1

    this.ctx.body = {
      success: updateSuccess
    }
  }

  async getArticleList() {
    const sql = `SELECT
                    article.id AS id,
                    article.title AS title,
                    article.introduce AS introduce,
                    article.addTime AS addTime,
                    article.view_count AS view_count,
                    type.typeName AS typeName 
                FROM
                    article
                    LEFT JOIN type ON article.type_id = type.id
                ORDER BY 
                    article.id DESC`;
    const res = await this.app.mysql.query(sql)
    this.ctx.body = { list: res }
  }

  async deleteArticle() {
    let id = this.ctx.params.id
    const res = await this.app.mysql.delete('article', {id})
    this.ctx.body = {data: res}
  }

  async getArticleById() {
    let id = this.ctx.params.id
    const sql = `SELECT
                    article.id AS id,
                    article.title AS title,
                    article.introduce AS introduce,
                    article.article_content AS article_content,
                    article.addTime AS addTime,
                    article.view_count AS view_count,
                    type.id AS typeId,
                    type.typeName AS typeName 
                FROM
                    article
                    LEFT JOIN type ON article.type_id = type.id
                WHERE 
                    article.id = ${id}`;

    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data: result}
  }
}

module.exports = MainController;
