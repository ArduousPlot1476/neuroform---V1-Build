export class QueryBuilder {
  private query: string;
  private params: any[];
  private paramCount: number;

  constructor(baseQuery: string) {
    this.query = baseQuery;
    this.params = [];
    this.paramCount = 0;
  }

  where(condition: string, value: any): this {
    this.paramCount++;
    this.query += this.params.length === 0 
      ? ` WHERE ${condition} = $${this.paramCount}`
      : ` AND ${condition} = $${this.paramCount}`;
    this.params.push(value);
    return this;
  }

  whereOptional(condition: string, value: any | undefined): this {
    if (value !== undefined) {
      this.where(condition, value);
    }
    return this;
  }

  orderBy(column: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.query += ` ORDER BY ${column} ${direction}`;
    return this;
  }

  limit(limit: number): this {
    this.paramCount++;
    this.query += ` LIMIT $${this.paramCount}`;
    this.params.push(limit);
    return this;
  }

  offset(offset: number): this {
    this.paramCount++;
    this.query += ` OFFSET $${this.paramCount}`;
    this.params.push(offset);
    return this;
  }

  build(): { query: string; params: any[] } {
    return {
      query: this.query,
      params: this.params,
    };
  }
}