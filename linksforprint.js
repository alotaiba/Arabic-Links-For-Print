/**
 * Arabic Links For Print jQuery plugin improves the readability of printed web pages,
 * by placing all the links on footnote, on the bottom of the page.
 * Copyright (C) 2010  Abdulrahman Alotaiba <http://www.mawqey.com/>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function($) {
	$.fn.linksForPrint = function() {
		var container = this;
		$hr = $("<hr/>")
			.addClass("nodisplay")
			.insertAfter(container);
		$footnotes = $("<div/>")
			.addClass("footnotes nodisplay")
			.insertAfter($hr);
		$orderedList = $("<ol/>")
			.appendTo($footnotes);

		var subNumber = 1;
		var linksArr = [];
		var subText = '';
		$(container).find("*[cite],*[href]").each(function(){
			var link = $(this).attr("href") ? $(this).attr("href") : $(this).attr("cite");

			if ((i = $.inArray(link, linksArr)) > -1)
			{
				subText = i + 1;
			}
			else
			{
				subText = subNumber;
				$orderedList.append("<li>&#x202A;" + decodeURI(link) + "&#x202C;</li>");
				linksArr.push(link);
				subNumber++;
			}
			subText = "&#x200F;<sup class=\"nodisplay\">(" + subText + ")</sup>";
			if (this.tagName.toLowerCase() == 'blockquote')
			{
				$(this).children(":last-child").append(subText);
			}
			else
			{
				$(this).after(subText);
			}
		});
		$(container).addClass("deleteLinks");
	}
})(jQuery);