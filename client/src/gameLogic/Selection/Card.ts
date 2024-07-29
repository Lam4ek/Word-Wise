export class Card {
  public matched: boolean = false;
  public active: boolean = false;

  constructor(
    public id: number,
    public content: string,
    public type: "term" | "definition"
  ) {}
}
