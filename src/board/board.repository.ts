import {BoardEntity} from "./entities/board.entity";
import {EntityRepository, Repository} from "typeorm";
import {Injectable} from "@nestjs/common";

/**
 * Board's repository to work with DB
 */
@Injectable()
@EntityRepository(BoardEntity)
export class BoardRepository extends Repository<BoardEntity> { }