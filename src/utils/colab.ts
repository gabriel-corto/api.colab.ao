import { nanoid } from "nanoid";

export class Colab {
  generateId(name: string) {
    const generated = `${name}-${nanoid(3)}`;
    return generated
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
}
