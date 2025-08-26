// This is a completely styled version of the dialogs only - replace the old ones

{/* Edit Lesson Dialog - Improved Styling */}
<Dialog open={isEditLessonDialogOpen} onOpenChange={setIsEditLessonDialogOpen}>
  <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
    <DialogHeader className="pb-4 border-b border-gray-200">
      <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Edit className="h-5 w-5 text-blue-600" />
        Chỉnh sửa bài giảng
      </DialogTitle>
      <DialogDescription className="text-gray-600">
        Cập nhật thông tin và nội dung bài giảng
      </DialogDescription>
    </DialogHeader>
    
    <div className="space-y-6 py-6">
      {/* Basic Information Section */}
      <div className="bg-blue-50 rounded-lg p-5 space-y-4 border border-blue-200">
        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          Thông tin cơ bản
        </h4>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lessonTitle" className="text-sm font-medium text-gray-700">
              Tiêu đề bài giảng *
            </Label>
            <Input
              id="lessonTitle"
              value={editLesson.title || ""}
              onChange={(e) =>
                setEditLesson({ ...editLesson, title: e.target.value })
              }
              placeholder="VD: Số từ 1 đến 10"
              className="w-full bg-white border-blue-200 focus:border-blue-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lessonDesc" className="text-sm font-medium text-gray-700">
              Mô tả bài giảng *
            </Label>
            <Textarea
              id="lessonDesc"
              value={editLesson.description || ""}
              onChange={(e) =>
                setEditLesson({
                  ...editLesson,
                  description: e.target.value,
                })
              }
              rows={3}
              placeholder="Mô tả nội dung và mục tiêu bài giảng..."
              className="w-full resize-none bg-white border-blue-200 focus:border-blue-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lessonType" className="text-sm font-medium text-gray-700">Loại bài giảng *</Label>
              <Select
                value={editLesson.type || ""}
                onValueChange={(value) =>
                  setEditLesson({ ...editLesson, type: value })
                }
              >
                <SelectTrigger className="w-full bg-white border-blue-200">
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-red-500" />
                      Video
                    </div>
                  </SelectItem>
                  <SelectItem value="reading">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-500" />
                      Bài đọc
                    </div>
                  </SelectItem>
                  <SelectItem value="interactive">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-orange-500" />
                      Tương tác
                    </div>
                  </SelectItem>
                  <SelectItem value="game">
                    <div className="flex items-center gap-2">
                      <GamepadIcon className="h-4 w-4 text-purple-500" />
                      Trò chơi
                    </div>
                  </SelectItem>
                  <SelectItem value="song">
                    <div className="flex items-center gap-2">
                      <Headphones className="h-4 w-4 text-pink-500" />
                      Bài hát
                    </div>
                  </SelectItem>
                  <SelectItem value="exercise">
                    <div className="flex items-center gap-2">
                      <Edit className="h-4 w-4 text-blue-500" />
                      Bài tập
                    </div>
                  </SelectItem>
                  <SelectItem value="observation">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-teal-500" />
                      Quan sát
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lessonDuration" className="text-sm font-medium text-gray-700">Thời lượng *</Label>
              <Input
                id="lessonDuration"
                value={editLesson.duration || ""}
                onChange={(e) =>
                  setEditLesson({ ...editLesson, duration: e.target.value })
                }
                placeholder="VD: 15 phút"
                className="w-full bg-white border-blue-200 focus:border-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lessonOrder" className="text-sm font-medium text-gray-700">Thứ tự *</Label>
              <Input
                id="lessonOrder"
                type="number"
                value={editLesson.order || ""}
                onChange={(e) =>
                  setEditLesson({ ...editLesson, order: parseInt(e.target.value) })
                }
                placeholder="1, 2, 3..."
                min="1"
                className="w-full bg-white border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-green-50 rounded-lg p-5 space-y-4 border border-green-200">
        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
          <Play className="h-5 w-5 text-green-600" />
          Nội dung bài giảng
        </h4>
        
        {/* Content fields based on lesson type */}
        {editLesson.type === 'video' && (
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <Label htmlFor="videoUrl" className="text-sm font-medium flex items-center gap-2 mb-2">
                <Video className="h-4 w-4 text-red-600" />
                Link Video *
              </Label>
              <Input
                id="videoUrl"
                value={editLesson.videoUrl || ""}
                onChange={(e) =>
                  setEditLesson({ ...editLesson, videoUrl: e.target.value })
                }
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full border-green-200 focus:border-green-400"
              />
              <p className="text-xs text-gray-500 mt-1">Hỗ trợ: YouTube, Vimeo, hoặc link video trực tiếp</p>
            </div>
          </div>
        )}

        {editLesson.type === 'game' && (
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <Label htmlFor="gameUrl" className="text-sm font-medium flex items-center gap-2 mb-2">
                <GamepadIcon className="h-4 w-4 text-purple-600" />
                Link Game/Trò chơi *
              </Label>
              <Input
                id="gameUrl"
                value={editLesson.gameUrl || ""}
                onChange={(e) =>
                  setEditLesson({ ...editLesson, gameUrl: e.target.value })
                }
                placeholder="https://mathgames.com/..."
                className="w-full border-green-200 focus:border-green-400"
              />
              <p className="text-xs text-gray-500 mt-1">Link đến game giáo dục hoặc hoạt động tương tác</p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <Label htmlFor="lessonContent" className="text-sm font-medium flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-blue-600" />
              Nội dung chi tiết
            </Label>
            <Textarea
              id="lessonContent"
              value={editLesson.content || ""}
              onChange={(e) =>
                setEditLesson({ ...editLesson, content: e.target.value })
              }
              rows={6}
              placeholder="Nội dung chi tiết, hướng dẫn, ghi chú dành cho giáo viên..."
              className="w-full resize-none border-green-200 focus:border-green-400"
            />
          </div>
        </div>
      </div>

      {/* Materials Section */}
      <div className="bg-orange-50 rounded-lg p-5 space-y-4 border border-orange-200">
        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
          <Upload className="h-5 w-5 text-orange-600" />
          Tài liệu đính kèm
        </h4>
        
        <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center bg-white hover:bg-orange-25 transition-colors">
          <Upload className="h-12 w-12 text-orange-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700 mb-1">Kéo thả file hoặc click để chọn</p>
          <p className="text-xs text-gray-500 mb-4">Hỗ trợ: PDF, PPT, DOC, hình ảnh (tối đa 10MB)</p>
          <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-100">
            <Upload className="h-4 w-4 mr-2" />
            Chọn file
          </Button>
        </div>
      </div>
    </div>
    
    <DialogFooter className="bg-gray-50 px-6 py-4 -mx-6 -mb-6 rounded-b-lg border-t border-gray-200">
      <div className="flex items-center justify-between w-full">
        <div className="text-xs text-gray-500">
          * Các trường bắt buộc
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => setIsEditLessonDialogOpen(false)}
            className="border-gray-300 hover:bg-gray-50"
          >
            Hủy
          </Button>
          <Button 
            onClick={handleUpdateLesson}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Cập nhật bài giảng
          </Button>
        </div>
      </div>
    </DialogFooter>
  </DialogContent>
</Dialog>
