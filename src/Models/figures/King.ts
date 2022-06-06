import {Figure, FigureNames} from "../Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../ChessFigureBlack/BKing.png";
import whiteLogo from "../ChessFigureWhite/Wking.png";

export class King extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo // или черный или белый логотип
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target))
            return false;
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);
        return (dx === 1 && dy === 1) || (dx === 1 && dy === 1) || (dy === 1 && dx === 0) || (dx === 1 && dy === 0)

    }

}