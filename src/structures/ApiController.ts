import axios from 'axios'

export default class ApiController {
  private readonly axiosInstance: any

  constructor () {
    this.axiosInstance = axios.create({
      baseURL: process.env.API_BASE_URL
      // headers: {
      //   Authorization: `Bot ${this.token}`
      // }
    })
  }

  async hello (): Promise<any> {
    const res = await this.axiosInstance.get('/')
    return res.data
  }
}
