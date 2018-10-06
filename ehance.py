#!/usr/bin/env python

from PIL import Image
from PIL import ImageEnhance
import sys
import os
import numpy as np

full_path = os.path.realpath(sys.argv[1])

# 原始图像
image = Image.open(full_path)

w, h = image.size
new_image = Image.new('RGB', (w, h), 'white')
new_pixels = new_image.load()

def get_color(image, x, y):
    """
    获取色值
    :param image:
    :param x:
    :param y:
    :return:
    """
    if isinstance(image, type(Image.new('RGB', (0, 0), 'white'))):
        r, g, b = image.getpixel((x, y))[:3]
    else:
        r, g, b = image[x, y]
    return r, g, b


def is_noise(image, x, y):
    """
    判断是否是是噪点
    :param image:
    :param x:
    :param y:
    :param w:
    :param h:
    :return:
    """
    white_count = 0
    for i in range(x - 1, x + 2):
        for j in range(y - 1, y + 2):
            r, g, b = get_color(image, i, j)
            if (r, g, b) == (255, 255, 255):
                white_count += 1
    return white_count >= 7


def clear_noise(image, new_pixels):
    """
    清理噪点
    :param image:
    :param new_pixels:
    :return:
    """
    clear_count = 0
    for i in range(w):
        for j in range(h):
            r, g, b = get_color(image, i, j)

            if r != g != b and is_noise(image, i, j):
                clear_count += 1
                print(clear_count)
                new_pixels[i, j] = (255, 255, 255)
            else:
                new_pixels[i, j] = (r, g, b)
    return clear_count


def clear_color(new_pixels):
    """
    清理高色值点，淡色点
    :param new_pixels:
    :return:
    """
    for i in range(w):
        for j in range(h):
            r, g, b = get_color(new_pixels, i, j)
            if np.average((r, g, b)) > 200:
                new_pixels[i, j] = (255, 255, 255)
            else:
                new_pixels[i, j] = (0, 0, 0)


clear_count = clear_noise(image, new_pixels)
while clear_count > 0:
    clear_count = clear_noise(new_pixels, new_pixels)
    print(clear_count)
    if clear_count == 0:
        break
# new_image.show()
clear_color(new_pixels)
# new_image.show()

# 对比度增强
enh_con = ImageEnhance.Contrast(new_image)
contrast = 3
image_contrasted = enh_con.enhance(contrast)

dir_name = os.path.dirname(full_path)
file_name = os.path.basename(full_path)
image_contrasted.save(os.path.join(dir_name, 'sharped' + file_name))
