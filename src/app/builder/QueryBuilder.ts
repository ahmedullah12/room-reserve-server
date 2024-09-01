import mongoose, { FilterQuery, Query } from 'mongoose';
import { Room } from '../modules/Room/Room.model';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm;
    if (searchTerm) {
      const searchConditions = searchableFields
        .map((field) => {
          const fieldType = Room.schema.path(field);
          if (fieldType instanceof mongoose.Schema.Types.Number) {
            const numericSearchTerm = Number(searchTerm);
            return isNaN(numericSearchTerm)
              ? null
              : { [field]: numericSearchTerm };
          } else {
            return { [field]: { $regex: searchTerm, $options: 'i' } };
          }
        })
        .filter((condition) => condition !== null);

      this.modelQuery = this.modelQuery.find({
        $or: searchConditions,
      } as FilterQuery<T>);
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (queryObj.price) {
      const [min, max] = (queryObj.price as string).split('-').map(Number);
      queryObj.pricePerSlot = {
        $gte: min || 0,
        ...(max && { $lte: max }),
      };
      delete queryObj.price;
    }

    if (queryObj.capacity) {
      const [min, max] = (queryObj.capacity as string).split('-').map(Number);
      queryObj.capacity = {
        $gte: min || 0,
        ...(max && { $lte: max }),
      };
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 100;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
