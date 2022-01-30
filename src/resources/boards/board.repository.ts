import {Board} from "../../entity/board.model";
import {EntityRepository, Repository} from "typeorm";

/**
 * Board's repository to work with DB
 */
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> { }