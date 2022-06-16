export default class TaskService {

  constructor(axiosInstance) {
    this.api = axiosInstance
  }

  async getAll() {
    try {
      const { data } = await this.api.get('tasks');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async add(task) {
    try {
      const { data } = await this.api.post('tasks', task);
      return data
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(task) {
    try {
      const { _id, description, completed } = task
      await this.api.put(`tasks/${_id}`, {
        description,
        completed
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      await this.api.delete(`tasks/${id}`);
    } catch (error) {
      throw new Error(error);
    }
  }
}