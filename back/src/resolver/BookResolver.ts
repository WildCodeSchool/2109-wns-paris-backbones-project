import { Resolver, Query } from "type-graphql";
import { Book } from "../models/Book";

@Resolver()
export class BookResolver {
  @Query(() => String)
  hello() {
    return "world";
  }
  @Query(() => [Book])
  books() {
    return Book.find();
  }
  @Mutation(() => Book)
  async createBook(@Arg("data") data: CreateBookInput) {
    const book = Book.create(data);
    await book.save();
    return book;
  }
}
