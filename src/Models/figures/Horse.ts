import {Figure, FigureNames} from "../Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../ChessFigureBlack/BHorse.png";
import whiteLogo from "../ChessFigureWhite/WHorse.png";

export class Horse extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo // или черный или белый логотип
        this.name = FigureNames.HORSE;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target))
            return false;
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y)
        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)

    }
}