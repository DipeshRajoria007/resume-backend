export default class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Handle filter object
    let queryStr = "";
    if (queryObj.filter) {
      try {
        queryStr = queryObj.filter;
      } catch (e) {
        throw new Error(`Invalid JSON in filter: ${queryObj.filter}`);
      }
    } else {
      queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
    }

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      let sortBy;
      if (typeof this.queryString.sort === "string") {
        try {
          sortBy = JSON.parse(this.queryString.sort);
        } catch (e) {
          throw new Error(`Invalid JSON in sort: ${this.queryString.sort}`);
        }
        this.query = this.query.sort(sortBy);
      } else {
        throw new Error(
          `Expected sort field to be a string, got ${typeof this.queryString
            .sort}`
        );
      }
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  search() {
    if (this.queryString.search) {
      this.query = this.query.find({
        $text: { $search: this.queryString.search },
      });
    }

    return this;
  }
}
